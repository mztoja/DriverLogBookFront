interface Friends {
    friendsToggleLabel: string;
    friendsTab: string;
    friendsListHeader: string;
    outgoingRequestsHeader: string;
    thLp: string;
    thFriend: string;
    thInfo: string;
    noFriends: string;
    placesToggleLabel: string;
    selfLabel: string;
    addFriend: string;
    addFriendConsentInfo: string;
    inviteSubmit: string;
    inviteSuccess: string;
    incomingRequestsHeader: string;
    accept: string;
    decline: string;
    cancelInvite: string;
    removeFriend: string;
    removeFriendConfirm: (name: string) => string;
    lastPositionLabel: string;
    lastActivityLabel: string;
    loadsWithoutReceiverLabel: string;
    activeTourNoLoads: string;
    noActivity: string;
    currentCargoLabel: string;
    targetPlaceLabel: string;
    loadDestinationsLabel: string;
    noActiveTour: string;
    noPosition: string;
    na: string;
    friendUserNotFound: string;
    friendCannotInviteSelf: string;
    friendAlreadyExists: string;
    friendNotFound: string;
    friendEmailInvalid: string;
}

export const friends: Friends[] =
    [{//en
        friendsToggleLabel: 'Friends',
        friendsTab: 'Friends',
        friendsListHeader: 'Friends',
        outgoingRequestsHeader: 'Sent invitations',
        thLp: 'No.',
        thFriend: 'Friend',
        thInfo: 'Current information',
        noFriends: 'You have no friends added yet.',
        placesToggleLabel: 'Places',
        selfLabel: 'You',
        addFriend: 'Add a friend',
        addFriendConsentInfo: 'After your friend accepts the invitation, you will both be able to see ' +
            'each other\'s last known position and information about the destination of the load ' +
            'currently being transported.',
        inviteSubmit: 'Send invitation',
        inviteSuccess: 'Invitation sent successfully.',
        incomingRequestsHeader: 'Pending invitations',
        accept: 'Accept',
        decline: 'Decline',
        cancelInvite: 'Cancel invitation',
        removeFriend: 'Remove friend',
        removeFriendConfirm: (name) => `Are you sure you want to remove ${name} from your friends? ` +
            `You will both lose access to each other's position and cargo destination.`,
        lastPositionLabel: 'Last position',
        lastActivityLabel: 'Last activity',
        loadsWithoutReceiverLabel: 'Loads without a receiver',
        activeTourNoLoads: 'Tour in progress, no load',
        noActivity: 'No entries yet',
        currentCargoLabel: 'Destination',
        targetPlaceLabel: 'Travel destination',
        loadDestinationsLabel: 'Cargo destination(s)',
        noActiveTour: 'No destination or active tour',
        noPosition: 'Position not known yet',
        na: '- - -',
        friendUserNotFound: 'No registered user found with this e-mail address.',
        friendCannotInviteSelf: 'You cannot invite yourself.',
        friendAlreadyExists: 'An invitation or friendship with this user already exists.',
        friendNotFound: 'This friend request no longer exists.',
        friendEmailInvalid: 'Please enter a valid e-mail address.',
    },
    {//pl
        friendsToggleLabel: 'Znajomi',
        friendsTab: 'Znajomi',
        friendsListHeader: 'Znajomi',
        outgoingRequestsHeader: 'Wysłane zaproszenia',
        thLp: 'Lp.',
        thFriend: 'Znajomy',
        thInfo: 'Aktualne informacje',
        noFriends: 'Nie masz jeszcze dodanych znajomych.',
        placesToggleLabel: 'Miejsca',
        selfLabel: 'Ty',
        addFriend: 'Dodaj znajomego',
        addFriendConsentInfo: 'Po zaakceptowaniu zaproszenia przez znajomego będziecie nawzajem mieli ' +
            'dostęp do swojej ostatniej pozycji oraz informacji o celu podróży i miejscach docelowych ' +
            'aktualnie przewożonego ładunku.',
        inviteSubmit: 'Wyślij zaproszenie',
        inviteSuccess: 'Zaproszenie zostało wysłane.',
        incomingRequestsHeader: 'Oczekujące zaproszenia',
        accept: 'Akceptuj',
        decline: 'Odrzuć',
        cancelInvite: 'Anuluj zaproszenie',
        removeFriend: 'Usuń znajomego',
        removeFriendConfirm: (name) => `Czy na pewno chcesz usunąć ${name} ze znajomych? ` +
            `Oboje stracicie dostęp do swojej pozycji i celu ładunku.`,
        lastPositionLabel: 'Ostatnia pozycja',
        lastActivityLabel: 'Ostatnia czynność',
        loadsWithoutReceiverLabel: 'Ładunki bez podanego odbiorcy',
        activeTourNoLoads: 'Trasa w toku, bez ładunku',
        noActivity: 'Brak wpisów',
        currentCargoLabel: 'Cel',
        targetPlaceLabel: 'Cel podróży',
        loadDestinationsLabel: 'Miejsca docelowe ładunku',
        noActiveTour: 'Brak celu i aktywnej trasy',
        noPosition: 'Pozycja jeszcze nieznana',
        na: '- - -',
        friendUserNotFound: 'Nie znaleziono zarejestrowanego użytkownika o tym adresie e-mail.',
        friendCannotInviteSelf: 'Nie możesz zaprosić samego siebie.',
        friendAlreadyExists: 'Zaproszenie albo znajomość z tym użytkownikiem już istnieje.',
        friendNotFound: 'To zaproszenie już nie istnieje.',
        friendEmailInvalid: 'Podaj prawidłowy adres e-mail.',
    }];
