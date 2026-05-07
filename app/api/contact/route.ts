import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validators/email";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const fullName = String(body?.fullName || "").trim();
    const email = String(body?.email || "")
      .trim()
      .toLowerCase();
    const subjectType = String(body?.subjectType || "").trim();
    const subject = String(body?.subject || "").trim();
    const message = String(body?.message || "").trim();
    const consent = Boolean(body?.consent);

    if (!fullName || !email || !subjectType || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Tous les champs obligatoires doivent être remplis.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Adresse email invalide.",
        },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Le message est trop court.",
        },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          error: "Le consentement est requis pour envoyer votre demande.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.ASSO_EMAIL;
    const toEmail = process.env.ASSO_EMAIL;
    const assoName = process.env.ASSO_NAME || "Vwa Kiltirèl";

    if (!apiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Configuration email incomplète.",
        },
        { status: 500 }
      );
    }

    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeSubjectType = escapeHtml(subjectType);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.65; color: #2b211d;">
        <h2 style="margin-bottom: 16px;">Nouveau message depuis le formulaire de contact — ${assoName}</h2>

        <p><strong>Nom :</strong> ${safeFullName}</p>
        <p><strong>Email :</strong> ${safeEmail}</p>
        <p><strong>Type de demande :</strong> ${safeSubjectType}</p>
        <p><strong>Sujet :</strong> ${safeSubject}</p>

        <hr style="margin: 24px 0;" />

        <p><strong>Message :</strong></p>
        <p>${safeMessage}</p>
      </div>
    `;

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: assoName,
          email: fromEmail,
        },
        to: [
          {
            email: toEmail,
            name: assoName,
          },
        ],
        replyTo: {
          email,
          name: fullName,
        },
        subject: `Contact site — ${subject}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Brevo error: ${errorText}`);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Votre message a bien été envoyé. L’équipe Vwa Kiltirèl vous répondra dès que possible.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue lors de l’envoi du message.",
      },
      { status: 500 }
    );
  }
}