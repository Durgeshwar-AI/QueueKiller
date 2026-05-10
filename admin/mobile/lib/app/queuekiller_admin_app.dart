import 'package:flutter/material.dart';
import 'package:queuekiller_admin/app/app_theme.dart';
import 'package:queuekiller_admin/features/admin/admin_gateway.dart';

class QueueKillerAdminApp extends StatelessWidget {
  const QueueKillerAdminApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'QueueKiller Admin',
      theme: AppTheme.light(),
      home: const AdminGateway(),
    );
  }
}
