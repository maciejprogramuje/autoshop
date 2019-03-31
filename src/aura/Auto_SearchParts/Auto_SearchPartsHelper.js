({
    searchPart: function(component, event) {
        let searchText = component.get('v.searchPart');
        let action = component.get('c.searchForParts');

        action.setParams({searchText: searchText});
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let ids = response.getReturnValue();
                sessionStorage.setItem('customSearch--recordIds', JSON.stringify(ids));

                let navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/parts-search-results'});
                navEvt.fire();
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action);
    },

    doShowToast: function(component, message, title, typeToast) {
        const toastComponent = component.find('toast');
        if (toastComponent) {
            toastComponent.showToast(message, title, typeToast);
        }
        else {
            console.error("'Toast Component' does not exist");
        }
    },

})