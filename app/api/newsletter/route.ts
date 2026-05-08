import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";
import { sendNewsletterWelcomeEmail, addContactToBrevoList } from "@/lib/brevo";
import { isValidEmail } from "@/lib/validators/email";

type NewsletterBody = {
  email?: string;
  firstName?: string;
  source?: string;
  consent?: boolean;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NewsletterBody;

    const email = String(body.email || "").trim().toLowerCase();
    const firstName = String(body.firstName || "").trim();
    const source = String(body.source || "newsletter_form_site").trim();
    const consent = body.consent === true;

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          error: "Le consentement est requis pour s'inscrire à la newsletter.",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "L’adresse e-mail est requise.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Veuillez entrer une adresse e-mail valide.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingSubscriber = await NewsletterSubscriber.findOne({ email });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        existingSubscriber.isActive = true;
        existingSubscriber.unsubscribedAt = null;
        existingSubscriber.firstName = firstName || existingSubscriber.firstName;
        existingSubscriber.source = source || existingSubscriber.source;
        await existingSubscriber.save();

        try {
          await sendNewsletterWelcomeEmail({
            toEmail: email,
            firstName: existingSubscriber.firstName || firstName,
          });
        } catch (mailError) {
          console.error("Newsletter welcome email error (re-subscription):", mailError);
        }

        try {
          await addContactToBrevoList({ email, firstName: existingSubscriber.firstName || firstName });
        } catch (brevoError) {
          console.error("Brevo contact sync error (re-subscription):", brevoError);
        }

        return NextResponse.json(
          {
            success: true,
            message: "Votre inscription à la newsletter est confirmée.",
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Cette adresse e-mail est déjà inscrite à la newsletter.",
        },
        { status: 200 }
      );
    }

    const subscriber = await NewsletterSubscriber.create({
      email,
      firstName,
      source,
      isActive: true,
      subscribedAt: new Date(),
    });

    let mailWarning: string | null = null;

    try {
      await sendNewsletterWelcomeEmail({
        toEmail: email,
        firstName,
      });
    } catch (mailError) {
      console.error("Newsletter welcome email error:", mailError);
      mailWarning =
        "Votre inscription est bien enregistrée, mais l’e-mail de bienvenue n’a pas pu être envoyé immédiatement.";
    }

    try {
      await addContactToBrevoList({ email, firstName });
    } catch (brevoError) {
      console.error("Brevo contact sync error:", brevoError);
    }

    return NextResponse.json(
      {
        success: true,
        message: mailWarning
          ? "Inscription enregistrée."
          : "Votre inscription à la newsletter est confirmée.",
        mailWarning,
        subscriber: {
          id: String(subscriber._id),
          email: subscriber.email,
          firstName: subscriber.firstName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/newsletter error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}