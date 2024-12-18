const NotificationModel = require('../models/notification');
const BookingModel = require('../models/booking');
const ClassModel = require('../models/class');

// Function to check and create notifications for starting classes
const checkStartingClasses = async () => {
    try {
        const currentTime = new Date();
        // Look for classes starting in the next 5 minutes
        const fiveMinutesFromNow = new Date(currentTime.getTime() + 5 * 60000);
        
        // Find all bookings for classes that are about to start
        const upcomingBookings = await BookingModel.find({
            status: 'active'
        }).populate('classId');

        for (const booking of upcomingBookings) {
            if (!booking.classId) continue;

            const classStartTime = new Date(booking.classId.startTime);
            
            // Check if class starts within the next 5 minutes
            if (classStartTime > currentTime && classStartTime <= fiveMinutesFromNow) {
                // Create notification if it doesn't already exist
                const existingNotification = await NotificationModel.findOne({
                    userId: booking.userId,
                    classId: booking.classId._id,
                    type: 'class_start',
                    createdAt: {
                        $gte: new Date(currentTime.getTime() - 5 * 60000) // Within last 5 minutes
                    }
                });

                if (!existingNotification) {
                    await NotificationModel.create({
                        userId: booking.userId,
                        title: 'Class Starting Soon',
                        message: `Your class "${booking.classId.name}" is starting in 5 minutes!`,
                        type: 'class_start',
                        classId: booking.classId._id,
                        read: false
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error checking for starting classes:', error);
    }
};

// Export functions
module.exports = {
    checkStartingClasses
};
