import 'package:flutter/material.dart';

class BookingsPage extends StatelessWidget {
  const BookingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    const bookings = [
      _BookingData('Amina Yusuf', 'Acme Health', 'Today, 10:30 AM', 'Upcoming'),
      _BookingData(
        'Carlos Vega',
        'Northwind Support',
        'Today, 11:15 AM',
        'Attended',
      ),
      _BookingData(
        'Lina Chen',
        'BluePeak Services',
        'Today, 12:00 PM',
        'Cancelled',
      ),
    ];

    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        ...bookings.map(
          (booking) => Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: _BookingCard(data: booking),
          ),
        ),
      ],
    );
  }
}

class _BookingData {
  const _BookingData(this.user, this.company, this.time, this.status);

  final String user;
  final String company;
  final String time;
  final String status;
}

class _BookingCard extends StatelessWidget {
  const _BookingCard({required this.data});

  final _BookingData data;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Container(
              height: 48,
              width: 48,
              decoration: BoxDecoration(
                color: const Color(0xFFE0E7FF),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Icon(
                Icons.event_note_rounded,
                color: Color(0xFF4F46E5),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    data.user,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    data.company,
                    style: const TextStyle(color: Color(0xFF64748B)),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    data.time,
                    style: const TextStyle(
                      color: Color(0xFF94A3B8),
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: const Color(0xFFE2E8F0),
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(
                data.status,
                style: const TextStyle(
                  color: Color(0xFF334155),
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
