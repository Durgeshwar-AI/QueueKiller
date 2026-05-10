import 'package:flutter/material.dart';
import 'package:queuekiller_admin/features/admin/admin_shell.dart';
import 'package:queuekiller_admin/features/auth/login_screen.dart';

class AdminGateway extends StatefulWidget {
  const AdminGateway({super.key});

  @override
  State<AdminGateway> createState() => _AdminGatewayState();
}

class _AdminGatewayState extends State<AdminGateway> {
  bool isAuthenticated = false;
  String email = 'admin@example.com';

  void handleLogin(String value) {
    setState(() {
      isAuthenticated = true;
      email = value;
    });
  }

  void handleLogout() {
    setState(() {
      isAuthenticated = false;
      email = 'admin@example.com';
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!isAuthenticated) {
      return LoginScreen(onLogin: handleLogin);
    }

    return AdminShell(adminEmail: email, onLogout: handleLogout);
  }
}
