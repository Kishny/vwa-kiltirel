// lib/mail.ts
const BREVO_API_KEY: string = process.env.BREVO_API_KEY as string;
const ASSO_EMAIL: string = process.env.ASSO_EMAIL as string;
const ASSO_NAME = process.env.ASSO_NAME || "Vwa Kiltirèl";

if (!BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY manquant dans .env.local");
}

if (!ASSO_EMAIL) {
  throw new Error("ASSO_EMAIL manquant dans .env.local");
}

type Recipient = {
  email: string;
  name?: string;
};

type SendBrevoMailOptions = {
  to: Recipient[];
  subject: string;
  htmlContent: string;
  replyTo?: Recipient;
};

export async function sendBrevoMail({
  to,
  subject,
  htmlContent,
  replyTo,
}: SendBrevoMailOptions) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        email: ASSO_EMAIL,
        name: ASSO_NAME,
      },
      to,
      subject,
      htmlContent,
      replyTo,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("Brevo API error:", data);
    throw new Error(
      data?.message || "Erreur lors de l’envoi de l’email avec Brevo."
    );
  }

  return data;
}