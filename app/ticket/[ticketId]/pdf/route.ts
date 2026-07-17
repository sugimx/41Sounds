import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

async function getTicket(ticketId: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/public/${ticketId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

export async function GET(
    request: Request,
    context: { params: Promise<{ ticketId: string }> }
) {
    const { ticketId } = await context.params;

    const ticket = await getTicket(ticketId);

    if (!ticket) {
        return new NextResponse("Ticket not found", {
            status: 404,
        });
    }

    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([595, 842]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawRectangle({
        x: 30,
        y: 80,
        width: 535,
        height: 700,
        borderColor: rgb(0.85, 0.15, 0.45),
        borderWidth: 2,
        color: rgb(1, 1, 1),
        borderOpacity: 0.4,
    });

    const brand = "41Sounds";
    const brandWidth = bold.widthOfTextAtSize(brand, 26);
    page.drawText(brand, {
        x: (595 - brandWidth) / 2,
        y: 740,
        size: 26,
        font: bold,
        color: rgb(0.85, 0.15, 0.45),
    });

    const title = "Stunts & Street";
    const titleWidth = bold.widthOfTextAtSize(title, 20);

    page.drawText(title, {
        x: (595 - titleWidth) / 2,
        y: 710,
        size: 20,
        font: bold,
    });

    page.drawText(`Name: ${String(ticket.data.fullName || "")}`, {
        x: 100,
        y: 660,
        size: 14,
        font: bold,
    });

    // page.drawText(`Ticket No: ${String(ticket.data.ticketNumber || "")}`, {
    //     x: 100,
    //     y: 630,
    //     size: 14,
    //     font: bold,
    // });

    page.drawText(`Ticket No: ${String(ticket.data.ticketNumber || "")}`, {
        x: 100,
        y: 600,
        size: 14,
        font: bold,
    });

    // page.drawText(`Quantity: ${String(ticket.data.quantity || 0)}`, {
    //     x: 100,
    //     y: 570,
    //     size: 14,
    //     font: bold,
    // });

    // page.drawText(`Price:  ${String(ticket.data.price || 0)} INR`, {
    //     x: 100,
    //     y: 560,
    //     size: 14,
    //     font: bold,
    // });

    page.drawText(`Venue: Hindustan Concert Ground`, {
        x: 100,
        y: 540,
        size: 14,
        font: bold,
    });

    // page.drawText(`Venue: Hindustan Concert Ground`, {
    //     x: 100,
    //     y: 510,
    //     size: 14,
    //     font: bold,
    // });

    page.drawText(`Date : 18 July 2026`, {
        x: 100,
        y: 480,
        size: 14,
        font: bold,
    });


    page.drawLine({
        start: { x: 50, y: 430 },
        end: { x: 545, y: 430 },
        thickness: 1,
        color: rgb(0.85, 0.15, 0.45),
    });


    const qrLabel = "Scan for Entry";
    const qrLabelWidth = bold.widthOfTextAtSize(qrLabel, 12);

    page.drawText(qrLabel, {
        x: (595 - qrLabelWidth) / 2,
        y: 105,
        size: 12,
        font: bold,
        color: rgb(0.85, 0.15, 0.45),
    });

    // Generate QR
    const qrText = String(ticket.data.ticketNumber ?? "");

    const qrData = await QRCode.toDataURL(qrText);

    const qrBytes = Buffer.from(
        qrData.replace(/^data:image\/png;base64,/, ""),
        "base64"
    );

    const qrImage = await pdfDoc.embedPng(qrBytes);
    const qrSize = 300;
    const qrX = (595 - qrSize) / 2;

    page.drawImage(qrImage, {
        x: qrX,
        y: 120, // bottom area
        width: qrSize,
        height: qrSize,
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename=${ticket.data.ticketNumber}.pdf`,
        },
    });
}