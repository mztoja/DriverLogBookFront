import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {FriendSummaryInterface, userLangEnum} from "types";
import {friends as friendsTxt} from "../../assets/txt/friends";
import {useFriends} from "../../hooks/useFriends";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {ActionButton} from "../common/ActionButton";
import {WindowConfirm} from "../common/WindowConfirm";
import {AddFriend} from "./AddFriend";
import {FriendPositionInfo} from "./FriendPositionInfo";

interface Props {
    lang: userLangEnum;
}

// Karta "Znajomi" w /places — prosta lista znajomych z tymi samymi aktualnymi informacjami,
// które pokazuje kliknięcie pinezki na mapie (ostatnia pozycja + cel), oraz obsługa zaproszeń:
// dodanie, akceptacja/odrzucenie przychodzących, anulowanie wysłanych i usunięcie znajomego.
export const FriendsList = (props: Props) => {
    const txt = friendsTxt[props.lang];
    const {friends, loading, refreshFriends} = useFriends();
    const {fetchDataOld} = useApi();
    const [showAddFriend, setShowAddFriend] = useState<boolean>(false);
    const [toRemove, setToRemove] = useState<FriendSummaryInterface | null>(null);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    // za każdym wejściem na kartę — aktualne pozycje i zaproszenia (jak PlacesMap)
    useEffect(() => {
        refreshFriends();
        // eslint-disable-next-line
    }, []);

    // decline usuwa relację w każdym stanie: odrzuca przychodzące, anuluje wysłane, usuwa znajomego
    const respond = (friendshipId: number, accept: boolean): void => {
        const path = accept ? apiPaths.acceptFriendRequest : apiPaths.declineFriendRequest;
        fetchDataOld(path, 'POST', {id: friendshipId}).then(() => refreshFriends());
    };

    const removeFriend = (): void => {
        if (!toRemove) return;
        fetchDataOld(apiPaths.declineFriendRequest, 'POST', {id: toRemove.friendshipId}).then(() => {
            refreshFriends();
            setToRemove(null);
        });
    };

    if (!friends && loading) {
        return <CircularProgress/>;
    }

    return (
        <div className="TableView">
            <AddFriend lang={props.lang} show={showAddFriend} setShow={setShowAddFriend}/>
            {toRemove && (
                <WindowConfirm
                    lang={props.lang}
                    show={confirmOpen}
                    setShow={setConfirmOpen}
                    text={txt.removeFriendConfirm(`${toRemove.firstName} ${toRemove.lastName}`)}
                    execute={removeFriend}
                />
            )}
            <main className="Table">
                <section className="Table__Header">
                    <div className="Table__HeaderRow">
                        <span className="Table__Title">{txt.friendsListHeader}</span>
                        <div className="Table__HeaderSearch">
                            <ActionButton round ariaLabel={txt.addFriend} icon={<AddIcon/>}
                                          onClick={() => setShowAddFriend(true)}/>
                        </div>
                    </div>
                </section>
                <section className="Table__Body">
                    {!!friends?.incoming.length && (
                        <div className="PlacesMap__friendRequests FriendsList__requests">
                            <div className="PlacesMap__friendRequestsHeader">{txt.incomingRequestsHeader}</div>
                            {friends.incoming.map((request) => (
                                <div key={request.friendshipId} className="PlacesMap__friendRequest">
                                    <span>{request.firstName} {request.lastName} ({request.email})</span>
                                    <ActionButton round icon={<CheckIcon/>} ariaLabel={txt.accept}
                                                  onClick={() => respond(request.friendshipId, true)}/>
                                    <ActionButton round variant="danger" icon={<ClearIcon/>} ariaLabel={txt.decline}
                                                  onClick={() => respond(request.friendshipId, false)}/>
                                </div>
                            ))}
                        </div>
                    )}
                    {!!friends?.outgoing.length && (
                        <div className="PlacesMap__friendRequests FriendsList__requests">
                            <div className="PlacesMap__friendRequestsHeader">{txt.outgoingRequestsHeader}</div>
                            {friends.outgoing.map((request) => (
                                <div key={request.friendshipId} className="PlacesMap__friendRequest">
                                    <span>{request.firstName} {request.lastName} ({request.email})</span>
                                    <ActionButton round variant="danger" icon={<ClearIcon/>} ariaLabel={txt.cancelInvite}
                                                  onClick={() => respond(request.friendshipId, false)}/>
                                </div>
                            ))}
                        </div>
                    )}
                    <table>
                        <thead>
                        <tr>
                            <th>{txt.thLp}</th>
                            <th>{txt.thFriend}</th>
                            <th>{txt.thInfo}</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {friends?.self && (
                            <tr className="highlighted">
                                <td>—</td>
                                <td>
                                    {txt.selfLabel} ({friends.self.firstName} {friends.self.lastName})
                                </td>
                                <td>
                                    <FriendPositionInfo lang={props.lang} position={friends.self.position} lastActivity={friends.self.lastActivity}
                                                        cargo={friends.self.cargo}/>
                                </td>
                                <td></td>
                            </tr>
                        )}
                        {friends?.accepted.map((friend, index) => (
                            <tr key={friend.friendshipId}>
                                <td>{index + 1}</td>
                                <td>
                                    {friend.firstName} {friend.lastName}
                                    <br/>
                                    <span className="PlacesMap__address">{friend.email}</span>
                                </td>
                                <td>
                                    <FriendPositionInfo lang={props.lang} position={friend.position} lastActivity={friend.lastActivity}
                                                        cargo={friend.cargo}/>
                                </td>
                                <td>
                                    <ActionButton round variant="danger" icon={<PersonRemoveIcon/>}
                                                  ariaLabel={txt.removeFriend}
                                                  onClick={() => {
                                                      setToRemove(friend);
                                                      setConfirmOpen(true);
                                                  }}/>
                                </td>
                            </tr>
                        ))}
                        {friends && friends.accepted.length === 0 && (
                            <tr>
                                <td colSpan={4}>{txt.noFriends}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};
