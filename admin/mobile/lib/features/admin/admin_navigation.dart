import 'package:flutter/material.dart';
import 'package:queuekiller_admin/features/admin/admin_section.dart';

class AdminNavigation extends StatelessWidget {
  const AdminNavigation({
    super.key,
    required this.selected,
    required this.onSelect,
    required this.onLogout,
    required this.email,
  });

  final AdminSection selected;
  final ValueChanged<AdminSection> onSelect;
  final VoidCallback onLogout;
  final String email;

  @override
  Widget build(BuildContext context) {
    final items = <_NavEntry>[
      const _NavEntry(
        'Dashboard',
        Icons.dashboard_rounded,
        AdminSection.dashboard,
      ),
      const _NavEntry(
        'Companies',
        Icons.business_rounded,
        AdminSection.companies,
      ),
      const _NavEntry(
        'Bookings',
        Icons.event_note_rounded,
        AdminSection.bookings,
      ),
      const _NavEntry(
        'Settings',
        Icons.settings_rounded,
        AdminSection.settings,
      ),
    ];

    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 12),
            child: Row(
              children: [
                Container(
                  height: 44,
                  width: 44,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF4F46E5), Color(0xFF0F766E)],
                    ),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: const Icon(Icons.queue_rounded, color: Colors.white),
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'QueueKiller',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      SizedBox(height: 2),
                      Text(
                        'Admin workspace',
                        style: TextStyle(color: Colors.white70, fontSize: 12),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.06),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white.withOpacity(0.08)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Signed in as',
                    style: TextStyle(color: Colors.white60, fontSize: 12),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    email,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemBuilder: (context, index) {
                final item = items[index];
                final isSelected = item.section == selected;

                return Material(
                  color: isSelected
                      ? const Color(0xFF4F46E5).withOpacity(0.25)
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(16),
                  child: ListTile(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    leading: Icon(
                      item.icon,
                      color: isSelected ? Colors.white : Colors.white70,
                    ),
                    title: Text(
                      item.label,
                      style: TextStyle(
                        color: isSelected ? Colors.white : Colors.white70,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    onTap: () => onSelect(item.section),
                  ),
                );
              },
              separatorBuilder: (_, __) => const SizedBox(height: 4),
              itemCount: items.length,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: OutlinedButton.icon(
              onPressed: onLogout,
              icon: const Icon(Icons.logout_rounded),
              label: const Text('Logout'),
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.white,
                side: BorderSide(color: Colors.white.withOpacity(0.18)),
                padding: const EdgeInsets.symmetric(vertical: 14),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _NavEntry {
  const _NavEntry(this.label, this.icon, this.section);

  final String label;
  final IconData icon;
  final AdminSection section;
}
