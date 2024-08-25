'use client'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { MdPeople } from 'react-icons/md';

type HolidayType = {
  date: string;
  localName: string;
};

export default function Home() {
    const [holidays, setHolidays] = useState<HolidayType[]>([]);
    const year = moment().year();
    const today = moment().startOf('day'); 

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/NL`);
                if (response.status === 200) {
                    setHolidays(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch holidays:', error);
            }
        };
        fetchHolidays();
    }, [year]);

    const headers = [
        { title: 'Date' },
        { title: 'Day of the Week' },
        { title: 'National Holiday' },
        { title: 'Apply' }
    ];

    return (
        <div>
            <div className='flex gap-3 items-center mx-[8%] mt-10'>
                <div className='text-2xl bg-gray-300 rounded-full p-2'><MdPeople /></div>
                <h2 className='text-2xl font-bold'>National Holidays Settings</h2>
            </div>

            <div className='p-1 bg-gray-300 w-fit mx-[8%] my-10 text-sm font-medium'>
                <div className='flex '><p className='px-6 py-1'>Contract type</p> <p className='px-6 py-1'>Surcharge percentage</p></div>
            </div>

            <Paper className='mx-[8%] mb-5'>
                <TableContainer>
                    <Table>
                        <TableHead className='bg-gray-300'>
                            <TableRow>
                                {headers.map((header, index) => (
                                    <TableCell key={index}>{header.title}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {holidays.map((holiday, index) => {
                                const holidayDate = moment(holiday.date);
                                const isPast = holidayDate.isBefore(today);

                                return (
                                    <TableRow key={index} className={isPast ? 'opacity-50' : ''}>
                                        <TableCell>{holiday.date}</TableCell>
                                        <TableCell>{holidayDate.format('dddd')}</TableCell>
                                        <TableCell>{holiday.localName}</TableCell>
                                        <TableCell>
                                            <input type="checkbox" disabled={isPast} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
