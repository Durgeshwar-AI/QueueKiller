import 'dart:math' as math;

import 'package:flutter/material.dart';

class AdminDashboardPage extends StatelessWidget {
  const AdminDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final contentPadding = width >= 900 ? 32.0 : 20.0;

    return ListView(
      padding: EdgeInsets.all(contentPadding),
      children: [
        Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF4F46E5), Color(0xFF0F766E)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(28),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Dashboard overview',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 26,
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Monitor bookings, companies, and system health from a clean mobile-first admin view.',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.88),
                  height: 1.4,
                ),
              ),
              const SizedBox(height: 20),
              Wrap(
                spacing: 12,
                runSpacing: 12,
                children: const [
                  _Pill(label: 'Live data ready', icon: Icons.bolt_rounded),
                  _Pill(
                    label: 'Queue health 99.2%',
                    icon: Icons.monitor_heart_rounded,
                  ),
                  _Pill(label: '8 min avg response', icon: Icons.timer_rounded),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        const _MetricGrid(),
        const SizedBox(height: 20),
        LayoutBuilder(
          builder: (context, constraints) {
            if (constraints.maxWidth >= 1000) {
              return const Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(flex: 2, child: RevenuePanel()),
                  SizedBox(width: 20),
                  Expanded(child: ActivityPanel()),
                ],
              );
            }

            return const Column(
              children: [RevenuePanel(), SizedBox(height: 20), ActivityPanel()],
            );
          },
        ),
        const SizedBox(height: 20),
        const QuickActionsPanel(),
      ],
    );
  }
}

class _MetricGrid extends StatelessWidget {
  const _MetricGrid();

  @override
  Widget build(BuildContext context) {
    final metrics = [
      const _MetricData(
        'Revenue',
        r'\$24,530',
        '+12.5%',
        Icons.attach_money_rounded,
        Color(0xFF4F46E5),
      ),
      const _MetricData(
        'Active users',
        '3,240',
        '+8.2%',
        Icons.people_alt_rounded,
        Color(0xFF0F766E),
      ),
      const _MetricData(
        'Health',
        '99.2%',
        '+0.4%',
        Icons.health_and_safety_rounded,
        Color(0xFF0891B2),
      ),
      const _MetricData(
        'Bookings',
        '1,284',
        '+6.8%',
        Icons.event_available_rounded,
        Color(0xFFF97316),
      ),
    ];

    return Wrap(
      spacing: 16,
      runSpacing: 16,
      children: metrics
          .map(
            (metric) => SizedBox(
              width: math.min(
                320,
                (MediaQuery.of(context).size.width - 64) / 2,
              ),
              child: MetricCard(metric: metric),
            ),
          )
          .toList(),
    );
  }
}

class _MetricData {
  const _MetricData(this.label, this.value, this.change, this.icon, this.color);

  final String label;
  final String value;
  final String change;
  final IconData icon;
  final Color color;
}

class MetricCard extends StatelessWidget {
  const MetricCard({super.key, required this.metric});

  final _MetricData metric;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Container(
              height: 52,
              width: 52,
              decoration: BoxDecoration(
                color: metric.color.withOpacity(0.12),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Icon(metric.icon, color: metric.color),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    metric.label,
                    style: const TextStyle(
                      color: Color(0xFF64748B),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    metric.value,
                    style: const TextStyle(
                      color: Color(0xFF0F172A),
                      fontSize: 28,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    metric.change,
                    style: TextStyle(
                      color: metric.color,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class RevenuePanel extends StatelessWidget {
  const RevenuePanel({super.key});

  @override
  Widget build(BuildContext context) {
    const revenueData = [
      ('Mon', 3200),
      ('Tue', 2800),
      ('Wed', 4100),
      ('Thu', 3900),
      ('Fri', 5200),
      ('Sat', 4800),
      ('Sun', 3530),
    ];

    final maxRevenue = revenueData.map((entry) => entry.$2).reduce(math.max);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Revenue',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: Color(0xFF0F172A),
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Last 7 days',
              style: TextStyle(color: Color(0xFF64748B)),
            ),
            const SizedBox(height: 20),
            SizedBox(
              height: 220,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: revenueData.map((entry) {
                  final height = (entry.$2 / maxRevenue) * 170;

                  return Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 6),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Container(
                            height: height,
                            decoration: const BoxDecoration(
                              borderRadius: BorderRadius.vertical(
                                top: Radius.circular(14),
                              ),
                              gradient: LinearGradient(
                                colors: [Color(0xFF4F46E5), Color(0xFF0F766E)],
                                begin: Alignment.bottomCenter,
                                end: Alignment.topCenter,
                              ),
                            ),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            entry.$1,
                            style: const TextStyle(
                              fontSize: 12,
                              color: Color(0xFF64748B),
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 16),
            const Divider(height: 1),
            const SizedBox(height: 16),
            const Row(
              children: [
                Expanded(
                  child: _MiniStat(label: 'Average', value: r'\$3,631'),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: _MiniStat(label: 'Peak day', value: 'Friday'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _MiniStat extends StatelessWidget {
  const _MiniStat({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(color: Color(0xFF64748B), fontSize: 12),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            color: Color(0xFF0F172A),
            fontWeight: FontWeight.w800,
            fontSize: 18,
          ),
        ),
      ],
    );
  }
}

class ActivityPanel extends StatelessWidget {
  const ActivityPanel({super.key});

  @override
  Widget build(BuildContext context) {
    const activities = [
      _ActivityData(
        'John Smith',
        'Joined queue',
        '2 min ago',
        _ActivityState.active,
      ),
      _ActivityData(
        'Emma Davis',
        'Completed service',
        '8 min ago',
        _ActivityState.completed,
      ),
      _ActivityData(
        'Michael Chen',
        'Joined queue',
        '15 min ago',
        _ActivityState.active,
      ),
      _ActivityData(
        'Sarah Johnson',
        'Exited queue',
        '22 min ago',
        _ActivityState.inactive,
      ),
    ];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Recent activity',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: Color(0xFF0F172A),
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Live queue movement and status updates',
              style: TextStyle(color: Color(0xFF64748B)),
            ),
            const SizedBox(height: 20),
            ...activities.map(
              (activity) => Padding(
                padding: const EdgeInsets.only(bottom: 14),
                child: _ActivityTile(data: activity),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

enum _ActivityState { active, completed, inactive }

class _ActivityData {
  const _ActivityData(this.user, this.action, this.time, this.state);

  final String user;
  final String action;
  final String time;
  final _ActivityState state;
}

class _ActivityTile extends StatelessWidget {
  const _ActivityTile({required this.data});

  final _ActivityData data;

  @override
  Widget build(BuildContext context) {
    final colors = switch (data.state) {
      _ActivityState.active => const (Color(0xFF4F46E5), Color(0xFFE0E7FF)),
      _ActivityState.completed => const (Color(0xFF0F766E), Color(0xFFCCFBF1)),
      _ActivityState.inactive => const (Color(0xFF64748B), Color(0xFFE2E8F0)),
    };

    return Row(
      children: [
        Container(
          height: 44,
          width: 44,
          decoration: BoxDecoration(
            color: colors.$2,
            borderRadius: BorderRadius.circular(14),
          ),
          child: Icon(Icons.person_rounded, color: colors.$1),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                data.user,
                style: const TextStyle(
                  color: Color(0xFF0F172A),
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                data.action,
                style: const TextStyle(color: Color(0xFF64748B), fontSize: 12),
              ),
            ],
          ),
        ),
        const SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: colors.$2,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(
                data.state.name,
                style: TextStyle(
                  color: colors.$1,
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            const SizedBox(height: 6),
            Text(
              data.time,
              style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
            ),
          ],
        ),
      ],
    );
  }
}

class QuickActionsPanel extends StatelessWidget {
  const QuickActionsPanel({super.key});

  @override
  Widget build(BuildContext context) {
    final actions = [
      _ActionData(
        'Manage bookings',
        Icons.event_available_rounded,
        const Color(0xFF4F46E5),
      ),
      _ActionData(
        'Review companies',
        Icons.business_rounded,
        const Color(0xFF0F766E),
      ),
      _ActionData(
        'Open reports',
        Icons.analytics_rounded,
        const Color(0xFFF97316),
      ),
    ];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Quick actions',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: Color(0xFF0F172A),
              ),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: actions
                  .map(
                    (action) => SizedBox(
                      width: 210,
                      child: FilledButton.tonalIcon(
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('${action.label} tapped')),
                          );
                        },
                        icon: Icon(action.icon, color: action.color),
                        label: Text(action.label),
                        style: FilledButton.styleFrom(
                          backgroundColor: action.color.withOpacity(0.08),
                          foregroundColor: const Color(0xFF0F172A),
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }
}

class _ActionData {
  const _ActionData(this.label, this.icon, this.color);

  final String label;
  final IconData icon;
  final Color color;
}

class _Pill extends StatelessWidget {
  const _Pill({required this.label, required this.icon});

  final String label;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.12),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: Colors.white.withOpacity(0.12)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: Colors.white),
          const SizedBox(width: 8),
          Text(
            label,
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
