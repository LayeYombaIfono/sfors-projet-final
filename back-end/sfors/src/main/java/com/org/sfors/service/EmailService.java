package com.org.sfors.service;

public interface EmailService {
    void envoyerEmailConfirmation(String destinataire, String nom, String prenoms);
}