package com.org.sfors.serviceImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.org.sfors.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void envoyerEmailConfirmation(String destinataire, String nom, String prenoms) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("formationteam565@gmail.com");
        message.setTo(destinataire);
        message.setSubject("Confirmation d'inscription à la formation");
        message.setText("Bonjour " + nom + " " + prenoms + ",\n\n"
                + "Nous avons le plaisir de vous informer que votre candidature à notre formation a été acceptée.\n\n"
                + "Au plaisir de vous revoir veuillez respectez l'heure prévu dans la publication .\n\n"
                + "Cordialement,\n"
                + "L'équipe de formation de la Douane Nationale Sourcemind Team 2");

        mailSender.send(message);
    }
}