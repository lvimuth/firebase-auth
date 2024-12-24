// app/page.js
import AuthForm from "./components/AuthForm";
import ToggleThemeButton from "./components/ToggleThemeButton";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
      <AuthForm />
      <ToggleThemeButton />
    </div>
  );
}
