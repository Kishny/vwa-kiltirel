import { generateUnsubscribeToken } from "@/lib/newsletter-token";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

type SendNewsletterWelcomeEmailParams = {
  toEmail: string;
  firstName?: string;
};

export async function sendNewsletterWelcomeEmail({
  toEmail,
  firstName,
}: SendNewsletterWelcomeEmailParams) {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.ASSO_EMAIL;
  const assoName = process.env.ASSO_NAME || "Vwa Kiltirèl";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vwakiltirel-asso.org";

  if (!apiKey || !fromEmail) {
    return {
      success: false,
      skipped: true,
      message: "Configuration Brevo incomplète.",
    };
  }

  const safeFirstName = firstName?.trim() || "";
  const intro = safeFirstName ? `Bonjour ${safeFirstName},` : "Bonjour,";

  const token = generateUnsubscribeToken(toEmail);
  const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${encodeURIComponent(token)}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2b211d;">
      <h2 style="margin-bottom: 12px;">Bienvenue dans la newsletter ${assoName} ✨</h2>

      <p>${intro}</p>

      <p>
        Merci pour votre inscription. Vous recevrez désormais nos prochains événements,
        ateliers, actualités et appels à participation.
      </p>

      <p>
        À très bientôt,<br />
        <strong>L’équipe ${assoName}</strong>
      </p>

      <hr style="margin: 20px 0;" />

      <p style="font-size: 12px; color: #777;">
        Vous ne souhaitez plus recevoir nos emails ?
        <br />
        <a href="${unsubscribeUrl}" target="_blank" rel="noopener noreferrer">
          Se désinscrire
        </a>
      </p>
    </div>
  `;

  const payload = {
    sender: {
      name: assoName,
      email: fromEmail,
    },
    to: [
      {
        email: toEmail,
        name: safeFirstName || undefined,
      },
    ],
    subject: `Bienvenue dans la newsletter ${assoName}`,
    htmlContent,
  };

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo error: ${errorText}`);
  }

  return {
    success: true,
  };
}

type AddContactToBrevoListParams = {
  email: string;
  firstName?: string;
};

export async function addContactToBrevoList({
  email,
  firstName,
}: AddContactToBrevoListParams): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_NEWSLETTER_LIST_ID;

  if (!apiKey || !listIdRaw) return;

  const listId = parseInt(listIdRaw, 10);
  if (isNaN(listId)) return;

  const payload: Record<string, unknown> = {
    email,
    listIds: [listId],
    updateEnabled: true,
  };

  if (firstName?.trim()) {
    payload.attributes = { FIRSTNAME: firstName.trim() };
  }

  const response = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo contacts error: ${errorText}`);
  }
}