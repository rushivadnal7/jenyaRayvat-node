import eventModel from "../models/eventModel.js";

export const createEvent = async (req, res) => {
    try {
        const { name, date, capacity , available , userId} = req.body;
        
        const eventData = {
            name,
            date,
            capacity,
            userId,
            available : capacity,
        }

        const event = new eventModel(eventData);
        await event.save();

        return res.json({
            succcess: true, message: 'event added'
        })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `Error Occured : ${error.message}` })
    }
}

export const listEvent = async (req, res) => {
    try {
        const events = await eventModel.find({});
        return res.json({ succcess: true, message: 'events', events });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `Error Occured : ${error.message}` })
    }
}

export const filterEvent = async (req, res) => {
    try {
        const { start, end } = req.query;

        if (!start || !end) {
            return res.json({ success: false, message: 'BOTH start and end dates are required' })
        }

        const events = await eventModel.find({
            date: {
                $gte: start,
                $lte: end
            }
        })

        res.json(events);

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `Error Occured : ${error.message}` })
    }
}

export const pagination = async (req, res) => {
    try {
        const { page, limit } = req.query;

        page = parseInt(page) || 1;

        limit = parseInt(page) || 10;

        const skip = (page - 1) * limit;

        const events = await eventModel.find().skip(skip).limit(limit);

        const totalEvents = await eventModel.countDocuments();

        res.json({ events, totalEvents, page, limit, skip, totalPages: Math.ceil(totalEvents / limit) });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `Error Occured : ${error.message}` })
    }
}
