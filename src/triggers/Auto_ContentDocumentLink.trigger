trigger Auto_ContentDocumentLink on ContentDocumentLink (before insert, before update) {
    for (ContentDocumentLink cont : Trigger.new) {
        cont.Visibility = 'AllUsers';
    }
}