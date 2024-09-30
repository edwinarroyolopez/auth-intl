"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function LoginPage() {

  const { status } = useSession();

  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log({ status: status })
  }, [status]);

  const handleSignIn = async () => {

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log({ result })

    if (result?.error) {
      setError(result.error);
    } else {
      // redirect to loggedPage
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    // router.push("/login");
  };


  return (
    <div>

      {status === "loading" && <p>Loading...</p>}

      {status === "authenticated" && (
        <div>
          <p>User Logged</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>

      )}

      {status === "unauthenticated" && (
        <div>
          <h3>Login</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign</button>
          </form>

          {/* Mostrar error si lo hay */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}
