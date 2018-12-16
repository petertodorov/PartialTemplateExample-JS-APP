function startApp() {
    const main = $('#main');
    loadContacts();

    async function loadContacts() {
        const [contactSource, allContactSource] = await Promise.all([$.get('contact.html'), $.get('contactList.html')])

        Handlebars.registerPartial('contact', contactSource);

        let contactTemplate = Handlebars.compile(contactSource);
        let allContactTemplate = Handlebars.compile(allContactSource);
        let context = {
            contacts: [
                {
                    firstName: 'Peter',
                    lastName: 'Todorov',
                    phone: '+359 886 732 402',
                    email: 'petodorov@gmail.com'
                },
                {
                    firstName: 'Zaek',
                    lastName: 'Baek',
                    phone: '+359 111 111 1111',
                    email: 'zaek@gmail.com'
                }]
        }

        main.html(allContactTemplate(context));

        $('.contactEntry').click(function (target) {
            let selectedName = $(target.currentTarget).find('div[id=names]').text().split(' ').shift();
            let selectedContact = context.contacts.find(contact => contact.firstName === selectedName);
            $('#singleContact').html(contactTemplate(selectedContact));
        });

    }
}