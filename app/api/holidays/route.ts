import Holidays from 'date-holidays';
import moment from 'moment';
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest) {

    try {
        const { searchParams } = new URL(req.url)
        const country = searchParams.get('country')
        const year = searchParams.get('year')
        const hd = new Holidays(country as string);
        const holidays = hd.getHolidays(year as  string) ;
      
        // Format dates using Moment.js
        const formattedHolidays = holidays.map((holiday) => ({
            name: holiday.name,
            date: moment(holiday.date).format('YYYY-MM-DD')
        }));
        return NextResponse.json({ success: true, data: formattedHolidays }, { status: 200 })
    } catch (error) {
        console.error('API Error:', (error as Error).message, error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
    }
}