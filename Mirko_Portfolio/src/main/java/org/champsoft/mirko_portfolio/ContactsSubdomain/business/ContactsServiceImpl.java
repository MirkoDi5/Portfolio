package org.champsoft.mirko_portfolio.ContactsSubdomain.business;

import org.champsoft.mirko_portfolio.ContactsSubdomain.data.Contacts;
import org.champsoft.mirko_portfolio.ContactsSubdomain.data.ContactsRepository;
import org.champsoft.mirko_portfolio.ContactsSubdomain.presentation.ContactsRequestDTO;
import org.champsoft.mirko_portfolio.ContactsSubdomain.presentation.ContactsResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ContactsServiceImpl implements ContactsService {

    private final ContactsRepository repo;

    @Autowired
    public ContactsServiceImpl(ContactsRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Contacts> getAllContacts() {
        return repo.findAll();
    }

    @Override
    public Contacts getContactById(String contactId) {
        return repo.findById(contactId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Contact not found with id: " + contactId
                ));
    }

    @Override
    public ContactsResponseDTO updateContact(String contactId, ContactsRequestDTO dto) {

        Contacts contact = repo.findById(contactId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Contact not found with id: " + contactId
                ));

        contact.setName(dto.getName());
        contact.setLastName(dto.getLastName());
        contact.setEmail(dto.getEmail());
        contact.setComment(dto.getComment());

        Contacts updatedContact = repo.save(contact);

        return new ContactsResponseDTO(
                updatedContact.getId(),

                updatedContact.getName(),
                updatedContact.getLastName(),
                updatedContact.getEmail(),
                updatedContact.getComment()
        );
    }

    @Override
    public ContactsResponseDTO createContact(ContactsRequestDTO dto) {

        if (dto == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Contact request must not be null"
            );
        }

        Contacts contact = new Contacts();
        contact.setName(dto.getName());
        contact.setLastName(dto.getLastName());
        contact.setEmail(dto.getEmail());
        contact.setComment(dto.getComment());

        Contacts savedContact = repo.save(contact);

        return new ContactsResponseDTO(
                savedContact.getId(),

                savedContact.getName(),
                savedContact.getLastName(),
                savedContact.getEmail(),
                savedContact.getComment()
        );
    }

    @Override
    public void deleteContact(String contactId) {

        Contacts contact = repo.findById(contactId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Contact not found with id: " + contactId
                ));

        repo.delete(contact);
    }
}
