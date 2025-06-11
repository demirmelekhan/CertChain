#![cfg(test)]
use soroban_sdk::{testutils::Address as _, Address, Env};

use crate::CertificateContract;
use crate::CertificateContractClient;

#[test]
fn test_issue_certificate() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CertificateContract);
    let client = CertificateContractClient::new(&env, &contract_id);

    let student = Address::random(&env);
    let course_name = "Blockchain Development 101";

    // Issue a certificate
    client.issue_certificate(&student, &course_name.into());

    // Verify total certificates
    assert_eq!(client.get_total_certificates(), 1);

    // Verify last recipient
    assert_eq!(client.get_last_recipient(), Some(student));
}

#[test]
fn test_multiple_certificates() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CertificateContract);
    let client = CertificateContractClient::new(&env, &contract_id);

    let student1 = Address::random(&env);
    let student2 = Address::random(&env);
    let course1 = "Blockchain Development 101";
    let course2 = "Smart Contract Development";

    // Issue certificates
    client.issue_certificate(&student1, &course1.into());
    client.issue_certificate(&student2, &course2.into());

    // Verify total certificates
    assert_eq!(client.get_total_certificates(), 2);

    // Verify last recipient is student2
    assert_eq!(client.get_last_recipient(), Some(student2));
}

#[test]
fn test_zero_certificates_initially() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CertificateContract);
    let client = CertificateContractClient::new(&env, &contract_id);

    // Initially there should be no certificates
    assert_eq!(client.get_total_certificates(), 0);
    assert_eq!(client.get_last_recipient(), None);
}
