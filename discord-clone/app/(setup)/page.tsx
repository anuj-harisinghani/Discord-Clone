import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
    const profile = await initialProfile();

    // look for servers that exist for the profile that has logged in
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    // if server found, redirect profile to server
    if (server) {
        return redirect(`/servers/${server.id}`)
    }
    
    // this happens when there is no server present for the profile visiting the page
    // taking the function from InitialModal to display here
    return <InitialModal/>

}

export default SetupPage;