import { Suspense } from "react";
import RegisterContent from "./RegisterContent";

const RegisterPage = () => {
    return (
        <Suspense fallback={null}>
            <RegisterContent />
        </Suspense>
    );
};

export default RegisterPage;