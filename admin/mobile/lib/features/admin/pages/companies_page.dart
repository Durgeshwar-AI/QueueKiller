import 'package:flutter/material.dart';

class CompaniesPage extends StatelessWidget {
  const CompaniesPage({super.key});

  @override
  Widget build(BuildContext context) {
    const companies = [
      _CompanyData(
        'Acme Health',
        '12 departments',
        '34 active bookings',
        'High priority',
      ),
      _CompanyData(
        'Northwind Support',
        '8 departments',
        '18 active bookings',
        'Healthy',
      ),
      _CompanyData(
        'BluePeak Services',
        '16 departments',
        '42 active bookings',
        'Needs review',
      ),
    ];

    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        ...companies.map(
          (company) => Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: _CompanyCard(data: company),
          ),
        ),
      ],
    );
  }
}

class _CompanyData {
  const _CompanyData(this.name, this.departments, this.bookings, this.status);

  final String name;
  final String departments;
  final String bookings;
  final String status;
}

class _CompanyCard extends StatelessWidget {
  const _CompanyCard({required this.data});

  final _CompanyData data;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  height: 52,
                  width: 52,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF4F46E5), Color(0xFF0F766E)],
                    ),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Icon(
                    Icons.business_rounded,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        data.name,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF0F172A),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        data.departments,
                        style: const TextStyle(color: Color(0xFF64748B)),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 6,
                  ),
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
            const SizedBox(height: 16),
            Text(
              data.bookings,
              style: const TextStyle(
                color: Color(0xFF0F172A),
                fontSize: 16,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
