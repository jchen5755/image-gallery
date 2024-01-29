import { Alert } from "@/components/bootstrap";
import { UnsplashImage } from "@/models/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Static Fetching - NextJS 14.1 Image Gallery",
};

//SSR with server componenet similar to getStaticProps
export default async function Page() {
    const response = await fetch(
        "https://api.unsplash.com/photos/random?client_id=" +
            process.env.UNSPLASH_ACCESS_KEY
    );
    const image: UnsplashImage = await response.json();

    //calcuates the width and height of the fetched image
    const width = Math.min(image.width, 500);
    const height = (width / image.width) * image.height;

    // className="d-flex felx-column align-items-center"
    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page <strong>fetches and caches data at build time</strong>
                . Even though the Unsplash API always returns a new image, we
                see the same image after refreshing the page unitl we compile
                the project again.
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
