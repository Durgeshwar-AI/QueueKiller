import 'package:flutter/material.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  bool notificationsEnabled = true;
  bool alertsEnabled = true;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        Card(
          child: SwitchListTile.adaptive(
            value: notificationsEnabled,
            onChanged: (value) {
              setState(() {
                notificationsEnabled = value;
              });
            },
            title: const Text('Push notifications'),
            subtitle: const Text('Get live queue and booking updates'),
          ),
        ),
        const SizedBox(height: 16),
        Card(
          child: SwitchListTile.adaptive(
            value: alertsEnabled,
            onChanged: (value) {
              setState(() {
                alertsEnabled = value;
              });
            },
            title: const Text('System alerts'),
            subtitle: const Text('Receive warnings about service health'),
          ),
        ),
      ],
    );
  }
}
