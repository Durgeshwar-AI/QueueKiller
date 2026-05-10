import 'package:flutter/material.dart';
import 'package:queuekiller_admin/features/admin/admin_navigation.dart';
import 'package:queuekiller_admin/features/admin/admin_section.dart';
import 'package:queuekiller_admin/features/admin/pages/bookings_page.dart';
import 'package:queuekiller_admin/features/admin/pages/companies_page.dart';
import 'package:queuekiller_admin/features/admin/pages/dashboard_page.dart';
import 'package:queuekiller_admin/features/admin/pages/settings_page.dart';

class AdminShell extends StatefulWidget {
  const AdminShell({
    super.key,
    required this.adminEmail,
    required this.onLogout,
  });

  final String adminEmail;
  final VoidCallback onLogout;

  @override
  State<AdminShell> createState() => _AdminShellState();
}

class _AdminShellState extends State<AdminShell> {
  AdminSection currentSection = AdminSection.dashboard;

  void _select(AdminSection section) {
    setState(() {
      currentSection = section;
    });
    Navigator.of(context).maybePop();
  }

  String get _sectionTitle {
    switch (currentSection) {
      case AdminSection.dashboard:
        return 'Dashboard';
      case AdminSection.companies:
        return 'Companies';
      case AdminSection.bookings:
        return 'Bookings';
      case AdminSection.settings:
        return 'Settings';
    }
  }

  Widget _buildContent() {
    switch (currentSection) {
      case AdminSection.dashboard:
        return const AdminDashboardPage();
      case AdminSection.companies:
        return const CompaniesPage();
      case AdminSection.bookings:
        return const BookingsPage();
      case AdminSection.settings:
        return const SettingsPage();
    }
  }

  @override
  Widget build(BuildContext context) {
    final isWide = MediaQuery.of(context).size.width >= 900;

    return Scaffold(
      appBar: AppBar(
        title: Text(_sectionTitle),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Center(
              child: Text(
                widget.adminEmail,
                style: const TextStyle(
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF475569),
                ),
              ),
            ),
          ),
        ],
      ),
      drawer: isWide
          ? null
          : Drawer(
              child: SafeArea(
                child: AdminNavigation(
                  selected: currentSection,
                  onSelect: _select,
                  onLogout: widget.onLogout,
                  email: widget.adminEmail,
                ),
              ),
            ),
      body: SafeArea(
        child: Row(
          children: [
            if (isWide)
              SizedBox(
                width: 280,
                child: AdminNavigation(
                  selected: currentSection,
                  onSelect: _select,
                  onLogout: widget.onLogout,
                  email: widget.adminEmail,
                ),
              ),
            Expanded(
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 250),
                child: _buildContent(),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: isWide
          ? null
          : NavigationBar(
              selectedIndex: currentSection.index,
              onDestinationSelected: (index) =>
                  _select(AdminSection.values[index]),
              destinations: const [
                NavigationDestination(
                  icon: Icon(Icons.dashboard_rounded),
                  label: 'Dashboard',
                ),
                NavigationDestination(
                  icon: Icon(Icons.business_rounded),
                  label: 'Companies',
                ),
                NavigationDestination(
                  icon: Icon(Icons.event_note_rounded),
                  label: 'Bookings',
                ),
                NavigationDestination(
                  icon: Icon(Icons.settings_rounded),
                  label: 'Settings',
                ),
              ],
            ),
    );
  }
}
