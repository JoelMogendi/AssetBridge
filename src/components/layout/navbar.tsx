import { auth } from "@/auth";
import BuyerNavbar from "./buyer-navbar";
import SellerNavbar from "./seller-navbar";
import PublicNavbar from "./public-navbar";

export default async function Navbar () {
    const session = await auth();

    // if no user is logged in
    if(!session?.user) {
        return <PublicNavbar />;
    };

    // route to specific dashboard
    if(session.user.role === "seller") {
        return <SellerNavbar user={session.user} />;
    };

    // Default buyer
    return <BuyerNavbar user={session.user} />;
};