//@ts-nocheck
"use client";

import { use, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface DateTimePickerComponentProps {
  Datehandler: (date: any) => void;
}

export default function DateTimePickerComponent({
  Datehandler,
}: DateTimePickerComponentProps) {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  useEffect(() => {
    Datehandler(selectedDateTime);
  }, [selectedDateTime]);
  const handleDateSelect = (date) => {
    setSelectedDateTime(date);
    if (selectedHour !== null && selectedMinute !== null) {
      const updatedDateTime = new Date(date);
      updatedDateTime.setHours(selectedHour);
      updatedDateTime.setMinutes(selectedMinute);
      setSelectedDateTime(updatedDateTime);
    }
  };

  const handleTimeSelect = (hour, minute) => {
    setSelectedHour(hour);
    setSelectedMinute(minute);
    if (selectedDateTime) {
      const updatedDateTime = new Date(selectedDateTime);
      updatedDateTime.setHours(hour);
      updatedDateTime.setMinutes(minute);
      setSelectedDateTime(updatedDateTime);
    }
  };

  return (
    <div className=''>
      <div className='flex items-center gap-3'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='flex items-center gap-2'>
              <CalendarDaysIcon className='w-5 h-5' />
              <span>
                {selectedDateTime
                  ? format(selectedDateTime, "MMM d, yyyy")
                  : "Select a date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='p-4 rounded-lg shadow-lg'>
            <Calendar
              mode='single'
              selected={selectedDateTime}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='flex items-center gap-2'>
              <ClockIcon className='w-5 h-5' />
              <span>
                {selectedDateTime
                  ? format(selectedDateTime, "h:mm a")
                  : "Select a time"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='p-4 rounded-lg shadow-lg'>
            <div className='grid grid-cols-2 gap-4'>
              <Select
                onValueChange={(value) =>
                  handleTimeSelect(parseInt(value), selectedMinute)
                }
              >
                <SelectTrigger className='h-10'>
                  <SelectValue
                    placeholder={
                      selectedHour !== null ? String(selectedHour) : "Hour"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => (
                    <SelectItem key={i} value={String(i + 1)}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) =>
                  handleTimeSelect(selectedHour, parseInt(value))
                }
              >
                <SelectTrigger className='h-10'>
                  <SelectValue
                    placeholder={
                      selectedMinute !== null
                        ? String(selectedMinute).padStart(2, "0")
                        : "Minute"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(60)].map((_, i) => (
                    <SelectItem key={i} value={String(i)}>
                      {i.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M8 2v4' />
      <path d='M16 2v4' />
      <rect width='18' height='18' x='3' y='4' rx='2' />
      <path d='M3 10h18' />
      <path d='M8 14h.01' />
      <path d='M12 14h.01' />
      <path d='M16 14h.01' />
      <path d='M8 18h.01' />
      <path d='M12 18h.01' />
      <path d='M16 18h.01' />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  );
}
