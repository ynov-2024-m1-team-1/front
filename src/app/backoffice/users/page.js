import TitlePage from "@/components/UI/TitlePage";

const UserBackOffice = () => {
    return (
        <div className="container mx-auto">
            <TitlePage title="Liste des utilisateurs" />
            <div className="min-h-screen">
                <h2 className="text-2xl mb-4">Tous les utilisateurs</h2>
                <div className="mb-8">
                    <p>
                        <a className="border-b" href="mailto:contact@mystore.fr">
                            
                        </a>
                    </p>
                </div>
                <div className="mb-8">
               
                </div>
            </div>
        </div>
    );
}

export default UserBackOffice;
