import { Metadata } from "next";
import SearchPage from "./SearchPage";

export const metadata: Metadata = {
    title: "Search - NextJS 14.1 Image Gallery",
};

export default function Page() {
    return (
        <>
            <SearchPage />
        </>
    );
}
