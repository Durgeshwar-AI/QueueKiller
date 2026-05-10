import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:queuekiller_admin/app/queuekiller_admin_app.dart';

void main() {
  testWidgets('shows the admin login screen', (WidgetTester tester) async {
    await tester.pumpWidget(const QueueKillerAdminApp());

    expect(find.text('QueueKiller Admin'), findsOneWidget);
    expect(find.text('Sign in'), findsOneWidget);
    expect(find.byType(TextFormField), findsNWidgets(2));
    expect(find.text('Login to admin'), findsOneWidget);
  });
}
