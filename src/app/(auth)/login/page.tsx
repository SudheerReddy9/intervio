import { Suspense } from "react";
import LoginContent from "./LoginContent";

const LoginPage = () => {
    return (
        <Suspense fallback={null}>
            <LoginContent />
        </Suspense>
    );
};

export default LoginPage;