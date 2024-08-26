import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CreadentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

/**
 * NextAuth configuration options.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const authOptions: NextAuthOptions = {
  /**
   * Session strategy.
   *
   * @see https://next-auth.js.org/configuration/options#session-strategy
   */
  session: {
    strategy: "jwt",
  },

  /**
   * Secret key for signing and verifying JWTs.
   *
   * @see https://next-auth.js.org/configuration/options#secret
   */
  secret: process.env.NEXTAUTH_SECRET,

  /**
   * Authentication providers.
   *
   * @see https://next-auth.js.org/providers
   */
  providers: [
    /**
     * Credentials provider.
     *
     * @see https://next-auth.js.org/providers/credentials
     */
    CreadentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      /**
       * Authorize function for credentials provider.
       *
       * @param {object} credentials - Credentials object.
       * @returns {Promise<object|null>} User object or null if authentication fails.
       */
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          fullname: string;
          password: string;
        };
        const user: any = await signIn({ email });
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),

    /**
     * Google provider.
     *
     * @see https://next-auth.js.org/providers/google
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],

  /**
   * Callbacks for authentication events.
   *
   * @see https://next-auth.js.org/configuration/callbacks
   */
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: "google",
          role: "member",
        };

        await signInWithGoogle(
          data,
          (result: { status: boolean; message: string; data: any }) => {
            if (result.status) {
              token.email = result.data.email;
              token.fullname = result.data.fullname;
              token.type = result.data.type;
              token.image = result.data.image;
              token.role = result.data.role;
            }
          }
        );
      }
      return token;
    },

    /**
     * Session callback.
     *
     * @param {object} session - Session object.
     * @param {object} token - JWT token.
     * @returns {object} Session object.
     */
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  /**
   * Pages configuration.
   *
   * @see https://next-auth.js.org/configuration/pages
   */
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
