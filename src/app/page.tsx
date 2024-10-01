'use client'
import { useTranslations } from 'next-intl';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  
  const intl = useTranslations('');

  const router = useRouter();
  const { status, data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
     // redirect to login
  };

  return (
    <div>
      <h3>{intl('HomePage.title')}</h3>
      <h3>{intl('HomePage.config.role')}</h3>
      <h3>{intl('home')}</h3>
      {status === "authenticated" && (
        <div>
          <p>User Logged</p>
          <p>{session.user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>

      )}
    </div>
  );
}
