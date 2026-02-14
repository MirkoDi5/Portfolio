package org.champsoft.mirko_portfolio.ContactsSubdomain.business;

import org.champsoft.mirko_portfolio.ContactsSubdomain.data.Contacts;
import org.champsoft.mirko_portfolio.ContactsSubdomain.presentation.ContactsRequestDTO;
import org.champsoft.mirko_portfolio.ContactsSubdomain.presentation.ContactsResponseDTO;

import java.util.List;

public interface ContactsService {

    List<Contacts> getAllContacts();

    Contacts getContactById(String contactId);

    ContactsResponseDTO createContact(ContactsRequestDTO dto);

    ContactsResponseDTO updateContact(String contactId, ContactsRequestDTO dto);

    void deleteContact(String contactId);
}
