// const { v4: uuidv4 } = require('uuid'); // Make sure uuid is installed: npm install uuid

// // Parse SMS commands for booking
// function parseSMSCommand(smsText) {
//     const parts = smsText.trim().split(/\s+/);
//     if (parts.length < 3) return null;

//     const command = parts[0].toUpperCase();
//     if (command === 'BOOK' && parts.length >= 4) {
//         return {
//             type: 'machinery',
//             item: parts[1].toLowerCase(),
//             date: parts[2],
//             location: parts[3]
//         };
//     }
//     if (command === 'LABOR' && parts.length >= 4) {
//         return {
//             type: 'labour',
//             skill: parts[1].toLowerCase(),
//             quantity: parseInt(parts[2]),
//             date: parts[3]
//         };
//     }
//     return null;
// }

// function handleSMSBooking(smsText, phoneNumber) {
//     const parsed = parseSMSCommand(smsText);
//     if (!parsed) {
//         return { success: false, message: 'Invalid SMS format. Please check the SMS guide.' };
//     }

//     const bookingId = 'SMS' + uuidv4().slice(0, 8);
//     let message = '';
//     if (parsed.type === 'machinery') {
//         message = `✅ Booking confirmed! ${parsed.item.charAt(0).toUpperCase() + parsed.item.slice(1)} booked for ${parsed.date} at ${parsed.location}. Booking ID: ${bookingId}`;
//     } else if (parsed.type === 'labour') {
//         message = `✅ ${parsed.quantity} labourers for ${parsed.skill} booked for ${parsed.date}. Booking ID: ${bookingId}`;
//     }

//     // Optionally, save booking to DB/localStorage here

//     return { success: true, message, bookingId };
// }

// module.exports = { handleSMSBooking };




const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

// ---------------- PARSER ----------------
function parseSMSCommand(smsText) {
    const parts = smsText.trim().split(/\s+/);
    if (parts.length < 2) return null;

    const command = parts[0].toUpperCase();

    // -------- BOOK MACHINERY --------
    if (command === 'BOOK') {

        // Find the date automatically
        const dateIndex = parts.findIndex(p =>
            /^\d{4}-\d{2}-\d{2}$/.test(p)
        );

        if (dateIndex === -1) return null;

        const item = parts.slice(1, dateIndex).join(' ').toLowerCase();
        const date = parts[dateIndex];
        const location = parts.slice(dateIndex + 1).join(' ');

        if (!item || !date || !location) return null;

        return {
            type: 'machinery',
            item,
            date,
            location
        };
    }

    // -------- LABOUR --------
    if (command === 'LABOR') {
        if (parts.length < 4) return null;

        return {
            type: 'labour',
            skill: parts[1].toLowerCase(),
            quantity: parseInt(parts[2]),
            date: parts[3]
        };
    }

    if (command === 'HELP') {
        return { type: 'help' };
    }

    return null;
}


// ---------------- HANDLER ----------------
async function handleSMSBooking(smsText, phoneNumber) {
    try {
        const parsed = parseSMSCommand(smsText);

        if (!parsed) {
            return {
                success: false,
                message: 'Invalid format.\nUse:\nBOOK TRACTOR YYYY-MM-DD LOCATION\nLABOR SKILL QTY DATE'
            };
        }

        if (parsed.type === 'help') {
            return {
                success: true,
                message:
`FarmConnect SMS Help:
BOOK <MACHINERY> <DATE> <LOCATION>
LABOR <SKILL> <QTY> <DATE>

Example:
BOOK tractor 2026-02-16 kalyani`
            };
        }

        // Fetch models INSIDE function (important fix)
        const User = mongoose.model('User');
        const Booking = mongoose.model('Booking');
        const Machinery = mongoose.model('Machinery');
        const Labour = mongoose.model('Labour');

        // ---------- FIND OR CREATE USER ----------
        let user = await User.findById(phoneNumber);

if (!user) {
    user = await User.create({
        _id: phoneNumber,
        name: 'SMS User',
        email: `sms_${phoneNumber.replace('+', '')}@farmconnect.local`,
        password: 'sms-disabled',
        phone: phoneNumber,
        role: 'customer'
    });
}


        // ---------- MACHINERY BOOKING ----------
        if (parsed.type === 'machinery') {

            const machinery = await Machinery.findOne({
    name: {
        $regex: `^${parsed.item}$`,
        $options: 'i'
    },
    isAvailable: true
});



            if (!machinery) {
                return {
                    success: false,
                    message: `Machinery "${parsed.item}" not available`
                };
            }

            const startDate = new Date(parsed.date);
            const endDate = new Date(parsed.date);
            endDate.setDate(endDate.getDate() + 1);

            const booking = await Booking.create({
                customerId: user._id,
                machineryId: machinery._id,
                items: [{
                    productId: machinery._id,
                    quantity: 1,
                    price: machinery.price
                }],
                totalAmount: machinery.price,
                startDate,
                endDate,
                duration: 1,
                deliveryAddress: { city: parsed.location },
                status: 'pending',
                paymentStatus: 'pending'
            });

            return {
                success: true,
                bookingId: booking._id.toString(),
                message:
`✅ Booking received!
Machinery: ${machinery.name}
Date: ${parsed.date}
Location: ${parsed.location}
Booking ID: ${booking._id}
Status: Pending confirmation`
            };
        }

        // ---------- LABOUR REQUEST ----------
        if (parsed.type === 'labour') {

            const labour = await Labour.findOne({
                skills: parsed.skill,
                isAvailable: true
            });

            if (!labour) {
                return {
                    success: false,
                    message: `No labour available for skill "${parsed.skill}"`
                };
            }

            return {
                success: true,
                bookingId: uuidv4(),
                message:
`✅ Labour request received!
Skill: ${parsed.skill}
Quantity: ${parsed.quantity}
Date: ${parsed.date}
Status: Pending confirmation`
            };
        }

    } catch (error) {
        console.error('SMS Booking Error:', error);
        return {
            success: false,
            message: 'Server error while processing booking.'
        };
    }
}

module.exports = { handleSMSBooking };
