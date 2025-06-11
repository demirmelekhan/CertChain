"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { connectWallet, getStoredPublicKey } from "@/utils/walletUtils";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const publicKey = getStoredPublicKey();
    if (publicKey) {
      router.push("/main");
    }
  }, [router]);

  const handleConnect = async () => {
    setIsLoading(true);
    setError("");
    try {
      await connectWallet();
      router.push("/main");
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Digital Certificate dApp
          </h1>
          <p className="text-gray-600">
            Connect your Freighter wallet to continue
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </button>
          {error && (
            <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
}
