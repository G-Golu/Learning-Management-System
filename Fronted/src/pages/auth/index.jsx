import { Tabs } from "@radix-ui/react-tabs";
import { GraduationCap } from "lucide-react";
import { useState } from "react";

import { Link } from "react-router-dom";

function AuthPage() {
const [activeTab, setActiveTab] = useState('Signin')

function handleTabChange(value) {
    setActiveTab(value)
}

    
    return <div className="flex-col min-h-screen">
        <header className="flex items-center px-4 border-b lg:px-6 h-14 ">
            <Link to={'/'} className="flex items-center justify-center">
            <GraduationCap className="w-8 h-8 mr-4"/>
            <span className="text-xl font-extrabold ">LMS Learn </span>
            </Link>
        </header>
        <div className="flex items-center justify-center min-h-screen bg-background">
            
           <Tabs
           value={activeTab}
           defaultValue="Signin"
           onValueChange={handleTabChange}
           className="w-full max-w-md"
           >
            
           </Tabs>
        </div>
    </div>
       
}

export default AuthPage;