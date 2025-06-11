"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { disconnectWallet, getStoredPublicKey } from "@/utils/walletUtils";
import certificateContract from "@/utils/certificateContract";

export default function Main() {
  const router = useRouter();
  const [publicKey, setPublicKey] = useState<string>("");
  const [studentKey, setStudentKey] = useState("");
  const [courseName, setCourseName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCertificates, setTotalCertificates] = useState<number>(0);
  const [lastRecipient, setLastRecipient] = useState<string>("");

  useEffect(() => {
    const storedKey = getStoredPublicKey();
    if (!storedKey) {
      router.push("/");
    } else {
      setPublicKey(storedKey);
      loadContractData();
    }
  }, [router]);

  const loadContractData = async () => {
    try {
      const [total, lastRecip] = await Promise.all([
        certificateContract.getTotalCertificates(),
        certificateContract.getLastRecipient(),
      ]);
      setTotalCertificates(total);
      setLastRecipient(lastRecip);
    } catch (error) {
      console.error("Failed to load contract data:", error);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await certificateContract.issueCertificate(studentKey, courseName);
      await loadContractData(); // Refresh the stats
      setStudentKey("");
      setCourseName("");
    } catch (err: any) {
      setError(err.message || "Failed to issue certificate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Digital Certificate dApp
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600 truncate">
              {publicKey.slice(0, 6)}...{publicKey.slice(-4)}
            </p>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Disconnect
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Issue Certificate
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="studentKey"
                className="block text-sm font-medium text-gray-700"
              >
                Student Public Key
              </label>
              <input
                type="text"
                id="studentKey"
                value={studentKey}
                onChange={(e) => setStudentKey(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="courseName"
                className="block text-sm font-medium text-gray-700"
              >
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Issuing..." : "Issue Certificate"}
            </button>
            {error && (
              <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
            )}
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Total Certificates Issued
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalCertificates}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Recipient</p>
              <p className="text-sm font-mono text-gray-900 truncate">
                {lastRecipient
                  ? `${lastRecipient.slice(0, 6)}...${lastRecipient.slice(-4)}`
                  : "None"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
