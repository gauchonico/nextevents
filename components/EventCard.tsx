import Link from "next/link";
import Image from "next/image";

interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({ title, image, slug, location, date, time}: Props) => {
    return (
        <Link href={`/events/${slug}`} id="event-card">
            <Image src={image} alt={title} width={410} height={300} className="poster" />
            <div className="flex flex-row gap-2">
                <Image src="/icons/pin.svg" alt="pin" width={14} height={14} />
                <p>{location}</p>
            </div>
            <div className="datetime">
                <Image src="/icons/clock.svg" alt="clock" width={14} height={14} />
                <p>{time}</p>

            </div>
            <p className="title">{title}</p>
        </Link>
    )
}
export default EventCard
