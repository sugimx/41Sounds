import Link from 'next/link';

interface TicketPageProps {
  params: Promise<{ ticketId: string }>;
}

const EVENT_DETAILS = {
  title: 'Muthamazhai 2.0',
  date: '18 July 2026',
  venue: 'Hindustan Concert Ground, Coimbatore',
  time: '6:30 PM',
  organizer: '41 Sounds',
};

async function getTicketFromAPI(ticketNumber: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/public/${ticketNumber}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;

  return await res.json();
}

export async function generateMetadata({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicketFromAPI(ticketId);

  return {
    title: `${ticket.data.ticketType} Ticket | ${EVENT_DETAILS.title}`,
    description: `View your ${ticket.data.ticketType} ticket details for ${EVENT_DETAILS.title} on ${EVENT_DETAILS.date}.`,
    robots: 'noindex, follow',
  };
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicketFromAPI(ticketId);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${ticket.data.ticketNumber}`;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.2),transparent_45%),linear-gradient(135deg,#09090b,#111827)] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-white/10 bg-black/55 p-6 shadow-2xl shadow-pink-950/30 backdrop-blur-md sm:p-8 lg:flex-row lg:items-stretch lg:p-10">
        <section className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className={`inline-flex rounded-full bg-linear-to-r from-pink-500 to-rose-500 px-3 py-1 text-sm font-semibold text-white`}>
            41 Sounds Presents
          </div>

          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">
            Your {EVENT_DETAILS.title} Ticket
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-300 sm:text-lg">
            Present this ticket at the venue entrance. Your booking reference is ready to be scanned.
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Venue</p>
              <p className="mt-1 text-lg font-semibold">{EVENT_DETAILS.venue}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Date & Time</p>
              <p className="mt-1 text-lg font-semibold">{EVENT_DETAILS.date} · {EVENT_DETAILS.time}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Event Attendee</p>
              <p className="mt-1 text-lg font-semibold">{ticket.data.fullName}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Ticket Tier</p>
              <p className="mt-1 text-lg font-semibold">{ticket.data.ticketType}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Ticket Quantity</p>
              <p className="mt-1 text-lg font-semibold">{ticket.data.quantity}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Seat Allotted</p>
              <p className="mt-1 text-lg font-semibold">{ticket.data.seatNumber}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-pink-400/50 bg-pink-500/10 p-4">
            <p className="text-sm uppercase tracking-[0.25em] text-pink-200">Ticket ID</p>
            <p className="mt-2 break-all font-mono text-sm text-pink-50 sm:text-base">{ticket.data.ticketNumber}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-500">
              Back to Home
            </Link>
            <Link href="/contact" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Need Help?
            </Link>
          </div>
        </section>

        <aside className="flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center sm:p-8">
          <div className="rounded-2xl border border-white/10 bg-white p-4 shadow-lg shadow-black/20">
            <img
              src={qrUrl}
              alt={`QR code for ticket ${ticket.data.ticketNumber}`}
              className="h-56 w-56 object-contain"
            />
          </div>

          <h2 className="mt-6 text-xl font-semibold text-white">Scan to verify</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            This QR code can be shown at the entrance for quick verification by the event team.
          </p>
          <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Status: Confirmed • Organized by {EVENT_DETAILS.organizer}
          </div>
        </aside>
      </div>
    </main>
  );
}
