// app/api/event-inscriptions/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import EventInscription from "@/models/EventInscription";
import { sendBrevoMail } from "@/lib/mail";

type EventInscriptionBody = {
  eventSlug?: string;
  eventTitle?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  adults?: number;
  children?: number;
  message?: string;
  isPaid?: boolean;
};

export async function GET() {
  try {
    await connectToDatabase();

    const inscriptions = await EventInscription.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: inscriptions.length,
        inscriptions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/event-inscriptions error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur lors de la récupération.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EventInscriptionBody;

    const data = {
      eventSlug: body.eventSlug?.trim() || "",
      eventTitle: body.eventTitle?.trim() || "",
      firstName: body.firstName?.trim() || "",
      lastName: body.lastName?.trim() || "",
      email: body.email?.trim().toLowerCase() || "",
      phone: body.phone?.trim() || "",
      adults: Number(body.adults ?? 1),
      children: Number(body.children ?? 0),
      message: body.message?.trim() || "",
      isPaid: Boolean(body.isPaid),
    };

    if (
      !data.eventSlug ||
      !data.eventTitle ||
      !data.firstName ||
      !data.lastName ||
      !data.email
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Champs obligatoires manquants.",
        },
        { status: 400 }
      );
    }

    if (!data.email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          error: "Adresse email invalide.",
        },
        { status: 400 }
      );
    }

    if (data.adults < 1 || data.adults > 20 || data.children < 0 || data.children > 20) {
      return NextResponse.json(
        {
          success: false,
          error: "Nombre de participants invalide.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await EventInscription.findOne({
      eventSlug: data.eventSlug,
      email: data.email,
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Cette adresse email est déjà inscrite à cet événement.",
        },
        { status: 409 }
      );
    }

    const inscription = await EventInscription.create({
      ...data,
      status: "pending",
    });

    let mailWarning: string | null = null;

    try {
      const assoEmail = process.env.ASSO_EMAIL;
      const assoName = process.env.ASSO_NAME || "Vwa Kiltirèl";

      if (!assoEmail) {
        throw new Error("ASSO_EMAIL manquant dans .env.local");
      }

      await sendBrevoMail({
        to: [{ email: assoEmail, name: assoName }],
        subject: `Nouvelle inscription – ${data.eventTitle}`,
        replyTo: {
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
        },
        htmlContent: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:640px;margin:0 auto;">
            <h2>Nouvelle inscription reçue</h2>
            <p><strong>Événement :</strong> ${data.eventTitle}</p>
            <p><strong>Slug :</strong> ${data.eventSlug}</p>
            <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;" />
            <p><strong>Prénom :</strong> ${data.firstName}</p>
            <p><strong>Nom :</strong> ${data.lastName}</p>
            <p><strong>Email :</strong> ${data.email}</p>
            <p><strong>Téléphone :</strong> ${data.phone || "Non renseigné"}</p>
            <p><strong>Adultes :</strong> ${data.adults}</p>
            <p><strong>Enfants :</strong> ${data.children}</p>
            <p><strong>Message :</strong> ${data.message || "Aucun message"}</p>
            <p><strong>Événement payant :</strong> ${data.isPaid ? "Oui" : "Non"}</p>
          </div>
        `,
      });

      await sendBrevoMail({
        to: [{ email: data.email, name: `${data.firstName} ${data.lastName}` }],
        subject: `Confirmation d'inscription – ${data.eventTitle}`,
        htmlContent: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:640px;margin:0 auto;">
            <h2>Bonjour ${data.firstName},</h2>
            <p>Votre inscription à l'événement <strong>${data.eventTitle}</strong> a bien été enregistrée.</p>
            <p>Nous vous recontacterons avec les informations pratiques si nécessaire.</p>
            <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;" />
            <p><strong>Participants :</strong> ${data.adults} adulte(s) et ${data.children} enfant(s)</p>
            <p><strong>Message transmis :</strong> ${data.message || "Aucun message"}</p>
            <p>Merci pour votre confiance,</p>
            <p><strong>Vwa Kiltirèl</strong></p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Brevo email sending error:", mailError);
      mailWarning =
        "Inscription enregistrée, mais l’email n’a pas pu être envoyé.";
    }

    return NextResponse.json(
      {
        success: true,
        message: mailWarning || "Inscription enregistrée avec succès.",
        inscription,
        mailWarning,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/event-inscriptions error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur lors de l’enregistrement.",
      },
      { status: 500 }
    );
  }
}