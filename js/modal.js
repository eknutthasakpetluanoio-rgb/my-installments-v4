/* ==========================================
   PayNest v1
   File : modal.js
   Version : 1.0.0
   Description : Modal Engine
========================================== */

let modal = null;

export function setupModal() {

    modal =
        document.getElementById(
            "contractModal"
        );

    const fab =
        document.getElementById(
            "fab"
        );

    const close =
        document.getElementById(
            "closeModal"
        );

    const cancel =
        document.getElementById(
            "cancelContract"
        );

    if (
        !modal ||
        !fab ||
        !close
    ) {

        return;

    }

    fab.addEventListener(
        "click",
        openModal
    );

    close.addEventListener(
        "click",
        closeModal
    );

    cancel?.addEventListener(
        "click",
        closeModal
    );

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }

    );

}

export function openModal() {

    modal?.classList.remove(
        "hidden"
    );

}

export function closeModal() {

    modal?.classList.add(
        "hidden"
    );

}
