# Generated by Django 4.2 on 2024-04-29 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0005_alter_event_event_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_description',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
