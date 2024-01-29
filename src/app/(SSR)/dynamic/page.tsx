import { Alert } from "@/components/bootstrap";
import { UnsplashImage } from "@/models/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Dynamic Fetching - NextJS 14.1 Image Gallery",
};

//built in NextJS revalidate and tells how often it should execute
//setting to 0 will fetch new iamge every refresh and will not me cached
//getServerSideProps
//export const revalidate = 0;

export default async function Page() {
    const response = await fetch(
        "https://api.unsplash.com/photos/random?client_id=" +
            process.env.UNSPLASH_ACCESS_KEY,
        {
            //this also amkes the page dynamic but without affecting the whole page
            //you can use no-cache or no-store
            //cache: "no-cache",
            next: { revalidate: 0 },
        }
    );
    const image: UnsplashImage = await response.json();

    //calcuates the width and height of the fetched image
    const width = Math.min(image.width, 500);
    const height = (width / image.width) * image.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page <strong>fetches data dynamically</strong>. Every time
                you refresh the page, you get a new image from the Unsplash API.
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
