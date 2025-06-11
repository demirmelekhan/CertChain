#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String};

#[contract]
pub struct CertificateContract;

#[contractimpl]
impl CertificateContract {
    pub fn issue_certificate(env: Env, student: Address, course_name: String) {
        // Get the current total certificates
        let total = Self::get_total_certificates(&env);
        
        // Increment the total
        env.storage().persistent().set(&"total", &(total + 1));
        
        // Store the last recipient
        env.storage().persistent().set(&"last_recipient", &student);

        // Optional: Store certificate details in a map
        // This is a basic implementation - you might want to add more details
        let key = (student.clone(), course_name.clone());
        env.storage().persistent().set(&key, &true);
    }

    pub fn get_total_certificates(env: &Env) -> u32 {
        env.storage().persistent().get(&"total").unwrap_or(0)
    }

    pub fn get_last_recipient(env: &Env) -> Option<Address> {
        env.storage().persistent().get(&"last_recipient")
    }
}
