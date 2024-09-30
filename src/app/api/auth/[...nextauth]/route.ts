import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "password", string> | any) {
                const user = await authenticateUser(credentials?.email, credentials?.password);
                if(user){
                    return user
                }else{
                    throw new Error("Invalid email or password");
                }
            }
        }),
    ],
    pages:{
        signIn: "/login",
        error: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
              token.name = user.name;
              token.email = user.email;

            //   token.lan = user.lan;

            }
            return token;
          },
        async session({ session, token }) {
            console.log({ session, token })
            // session.user.lan = token.lan
            if(token){
                // session.user = {
                // };
                // session.user.name = token.name as string;
                // session.user.email = token.email;
            }
            return session
        }
    },
    secret: 'abcd.1234',
    debug: true,
    session: {
        strategy: "jwt"  
    }
})

export { handler as GET, handler as POST }


async function authenticateUser(email: string, password: string) {
    if (email === "test@example.com" && password === "password123") {
        return { id: "1", name: "John Doe", email: "test@example.com", lan: "es", tokenJWT: 'my-token' };
    }
    return null;
}





