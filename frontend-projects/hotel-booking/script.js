/* =========================================
   1. LOAD BOOKING DATA
   ========================================= */

async function loadBookingData() {
    try {
        const response = await fetch("booking.json");

        if (!response.ok) {
            throw new Error("Could not load booking data.");
        }

        const booking = await response.json();

        displayBookingData(booking);

    } catch (error) {
        console.error("Booking data error:", error);
    }
}


/* =========================================
   2. DISPLAY BOOKING DATA
   ========================================= */

function displayBookingData(booking) {

    document.getElementById("confirmation-number").textContent =
        booking.confirmationNumber;

    document.getElementById("guest-name").textContent =
        booking.guestName;

    document.getElementById("room-type").textContent =
        booking.roomType;

    document.getElementById("check-in").textContent =
        formatDate(booking.checkIn);

    document.getElementById("check-out").textContent =
        formatDate(booking.checkOut);

    document.getElementById("booking-total").textContent =
        booking.total;

    document.getElementById("wifi-name").textContent =
        booking.wifi.network;

    document.getElementById("wifi-password").textContent =
        booking.wifi.password;
}


/* =========================================
   3. FORMAT DATES
   ========================================= */

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* =========================================
   4. MOBILE NAVIGATION
   ========================================= */

const menuToggle = document.getElementById("menu-toggle");
const sidebarNav = document.getElementById("sidebar-nav");

menuToggle.addEventListener("click", () => {

    const isOpen = sidebarNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
});


/* =========================================
   5. CLOSE MOBILE MENU AFTER CLICKING LINK
   ========================================= */

const navigationLinks =
    document.querySelectorAll(".sidebar-nav a");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        sidebarNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.textContent = "☰";
    });

});


/* =========================================
   6. COPY WIFI PASSWORD
   ========================================= */

const copyWifiButton =
    document.getElementById("copy-wifi");

const wifiPassword =
    document.getElementById("wifi-password");

const copyMessage =
    document.getElementById("copy-message");


copyWifiButton.addEventListener("click", async () => {

    const password = wifiPassword.textContent.trim();

    try {

        await navigator.clipboard.writeText(password);

        copyMessage.textContent =
            "Password copied!";

        copyWifiButton.textContent =
            "Copied";

        setTimeout(() => {

            copyMessage.textContent = "";

            copyWifiButton.textContent =
                "Copy";

        }, 2000);

    } catch (error) {

        copyMessage.textContent =
            "Could not copy password.";

        console.error(
            "Clipboard error:",
            error
        );
    }

});


/* =========================================
   7. PRINT RECEIPT
   ========================================= */

const printButton =
    document.getElementById("print-receipt");

printButton.addEventListener("click", () => {

    window.print();

});


/* =========================================
   8. ADD TO CALENDAR
   ========================================= */

const calendarButton =
    document.getElementById("add-calendar");


calendarButton.addEventListener("click", async () => {

    try {

        const response =
            await fetch("booking.json");

        const booking =
            await response.json();

        const startDate =
            convertToCalendarDate(booking.checkIn);

        const endDate =
            convertToCalendarDate(booking.checkOut);

        const calendarContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Oasis Modern Hotel//Hotel Booking//EN",
            "BEGIN:VEVENT",
            `UID:${booking.confirmationNumber}@oasismodern.com`,
            `DTSTART;VALUE=DATE:${startDate}`,
            `DTEND;VALUE=DATE:${endDate}`,
            "SUMMARY:Stay at Oasis Modern Hotel",
            `DESCRIPTION:Hotel booking for ${booking.guestName}`,
            "LOCATION:Oasis Modern Hotel",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob(
            [calendarContent],
            {
                type: "text/calendar"
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            "Oasis-Modern-Hotel-booking.ics";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    } catch (error) {

        console.error(
            "Calendar error:",
            error
        );

        alert(
            "Sorry, the calendar file could not be created."
        );
    }

});


/* =========================================
   9. CONVERT DATE TO ICS FORMAT
   ========================================= */

function convertToCalendarDate(dateString) {

    return dateString.replaceAll("-", "");

}


/* =========================================
   10. START APPLICATION
   ========================================= */

loadBookingData();