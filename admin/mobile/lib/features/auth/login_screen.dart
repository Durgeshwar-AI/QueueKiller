import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key, required this.onLogin});

  final ValueChanged<String> onLogin;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController(text: 'admin@example.com');
  final _passwordController = TextEditingController(text: 'admin123');

  bool _isSubmitting = false;
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!(_formKey.currentState?.validate() ?? false)) {
      return;
    }

    setState(() {
      _isSubmitting = true;
    });

    await Future<void>.delayed(const Duration(milliseconds: 500));

    if (!mounted) {
      return;
    }

    setState(() {
      _isSubmitting = false;
    });

    widget.onLogin(_emailController.text.trim());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFFF8FAFC), Color(0xFFE2E8F0), Color(0xFFDDE7FF)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 420),
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(
                                colors: [Color(0xFF4F46E5), Color(0xFF0F766E)],
                              ),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: const Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'QueueKiller Admin',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 24,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                                SizedBox(height: 6),
                                Text(
                                  'Manage companies, bookings, and system activity from one place.',
                                  style: TextStyle(
                                    color: Colors.white70,
                                    height: 1.4,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 24),
                          const Text(
                            'Sign in',
                            style: TextStyle(
                              color: Color(0xFF0F172A),
                              fontSize: 28,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'Use your admin credentials to continue.',
                            style: TextStyle(color: Color(0xFF64748B)),
                          ),
                          const SizedBox(height: 24),
                          TextFormField(
                            controller: _emailController,
                            keyboardType: TextInputType.emailAddress,
                            decoration: const InputDecoration(
                              labelText: 'Email address',
                              prefixIcon: Icon(Icons.alternate_email_rounded),
                            ),
                            validator: (value) {
                              final trimmed = value?.trim() ?? '';
                              if (trimmed.isEmpty) {
                                return 'Email is required';
                              }
                              if (!trimmed.contains('@')) {
                                return 'Enter a valid email';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 16),
                          TextFormField(
                            controller: _passwordController,
                            obscureText: _obscurePassword,
                            decoration: InputDecoration(
                              labelText: 'Password',
                              prefixIcon: const Icon(Icons.lock_rounded),
                              suffixIcon: IconButton(
                                onPressed: () {
                                  setState(() {
                                    _obscurePassword = !_obscurePassword;
                                  });
                                },
                                icon: Icon(
                                  _obscurePassword
                                      ? Icons.visibility_rounded
                                      : Icons.visibility_off_rounded,
                                ),
                              ),
                            ),
                            validator: (value) {
                              if ((value ?? '').isEmpty) {
                                return 'Password is required';
                              }
                              if ((value ?? '').length < 6) {
                                return 'Password must be at least 6 characters';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 24),
                          FilledButton(
                            onPressed: _isSubmitting ? null : _submit,
                            style: FilledButton.styleFrom(
                              backgroundColor: const Color(0xFF4F46E5),
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                            ),
                            child: _isSubmitting
                                ? const SizedBox(
                                    height: 20,
                                    width: 20,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                      valueColor: AlwaysStoppedAnimation<Color>(
                                        Colors.white,
                                      ),
                                    ),
                                  )
                                : const Text('Login to admin'),
                          ),
                          const SizedBox(height: 16),
                          TextButton(
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text(
                                    'Password reset is handled in the web admin for now.',
                                  ),
                                ),
                              );
                            },
                            child: const Text('Forgot password?'),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
