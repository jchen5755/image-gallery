//This page uses incrementail static regeneration (isr)
import { Alert } from "@/components/bootstrap";
import { UnsplashImage } from "@/models/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Incremental Static Regeneration - NextJS 14.1 Image Gallery",
};

//built in NextJS revalidate and tells how often it should execute
//setting to 0 will fetch new iamge every refresh and will not me cached
//getServerSideProps
export const revalidate = 15;

export default async function Page() {
    const response = await fetch(
        "https://api.unsplash.com/photos/random?client_id=" +
            process.env.UNSPLASH_ACCESS_KEY,
        {
            //this also amkes the page dynamic but without affecting the whole page
            //uo can use no-cache or no-store
            //cache: "no-cache",
            //next: { revalidate: 15 },
        }
    );
    const image: UnsplashImage = await response.json();

    //calcuates the width and height of the fetched image
    const width = Math.min(image.width, 500);
    const height = (width / image.width) * image.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page uses <strong>incremental static regeneration</strong>.
                A new image is fetched every 15 seconds from the Unsplash API
                (after refreshing the page) and then served from the cache for
                that duration.
            </Alert>
            <Image
                src={image.urls.raw}
                width={width}
                height={height}
                alt={image.description}
                className="rounded shadow mw-100 h-100"
            />
            by
            <Link href={"/users/" + image.user.username}>
                {image.user.username}
            </Link>
        </div>
    );
}
